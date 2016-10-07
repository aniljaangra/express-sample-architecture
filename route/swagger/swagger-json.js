/**
 * Created by thinksysuser on 5/10/16.
 */
module.exports = {

    /**
     * Required. Specifies the Swagger Specification version being used. It can be used by the Swagger UI and other
     * clients to interpret the API listing. The value MUST be "2.0".
     */
    "swagger": "2.0",

    /**
     * Required. Provides metadata about the API. The metadata can be used by the clients if needed.
     */
    "info": {
        "description": "This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.",
        "version": "1.0.0",
        "title": "Swagger Petstore",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "email": "apiteam@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },

    /**
     * The host (name or ip) serving the API. This MUST be the host only and does not include the scheme nor sub-paths.
     * It MAY include a port. If the host is not included, the host serving the documentation is to be used (including the port).
     * The host does not support path templating.
     */

    // "host": "petstore.swagger.io",
    "host": "localhost:3001",
    /**
     * The base path on which the API is served, which is relative to the host. If it is not included,
     * the API is served directly under the host. The value MUST start with a leading slash (/).
     * The basePath does not support path templating.
     */
    "basePath": "/v2",

    /**
     * [Tag Object]
     * TODO: configurable
     * A list of tags used by the specification with additional metadata.
     * The order of the tags can be used to reflect on their order by the parsing tools.
     * Not all tags that are used by the Operation Object must be declared. The tags that are not declared may be
     * organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
     */
    "tags": [
        {
            "name": "pet",
            "description": "Everything about your Pets",
            "externalDocs": {
                "description": "Find out more",
                "url": "http://swagger.io"
            }
        },
        {
            "name": "store",
            "description": "Access to Petstore orders"
        },
        {
            "name": "user",
            "description": "Operations about user",
            "externalDocs": {
                "description": "Find out more about our store",
                "url": "http://swagger.io"
            }
        }
    ],

    /**
     * [string]
     * The transfer protocol of the API. Values MUST be from the list: "http", "https", "ws", "wss".
     * If the schemes is not included, the default scheme to be used is the one used to access the Swagger definition itself.
     */
    "schemes": [
        "http"
    ],

    /**
     * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#pathsObject
     * Required. The available paths and operations for the API.
     */

    "paths": {
        /**
        "/pet": {
            "post": {
                "tags": [
                    "pet"
                ],
                "summary": "Add a new pet to the store",
                "description": "",
                "operationId": "addPet",
                "consumes": [
                    "application/json",
                    "application/xml"
                ],
                "produces": [
                    "application/xml",
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Pet object that needs to be added to the store",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Pet"
                        }
                    }
                ],
                "responses": {
                    "405": {
                        "description": "Invalid input"
                    }
                },
                "security": [
                    {
                        "petstore_auth": [
                            "write:pets",
                            "read:pets"
                        ]
                    }
                ]
            },
            "put": {
                "tags": [
                    "pet"
                ],
                "summary": "Update an existing pet",
                "description": "",
                "operationId": "updatePet",
                "consumes": [
                    "application/json",
                    "application/xml"
                ],
                "produces": [
                    "application/xml",
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Pet object that needs to be added to the store",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Pet"
                        }
                    }
                ],
                "responses": {
                    "400": {
                        "description": "Invalid ID supplied"
                    },
                    "404": {
                        "description": "Pet not found"
                    },
                    "405": {
                        "description": "Validation exception"
                    }
                },
                "security": [
                    {
                        "petstore_auth": [
                            "write:pets",
                            "read:pets"
                        ]
                    }
                ]
            }
        },
        "/pet/findByStatus": {
            "get": {
                "tags": [
                    "pet"
                ],
                "summary": "Finds Pets by status",
                "description": "Multiple status values can be provided with comma separated strings",
                "operationId": "findPetsByStatus",
                "produces": [
                    "application/xml",
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "status",
                        "in": "query",
                        "description": "Status values that need to be considered for filter",
                        "required": true,
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "available",
                                "pending",
                                "sold"
                            ],
                            "default": "available"
                        },
                        "collectionFormat": "multi"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Pet"
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid status value"
                    }
                },
                "security": [
                    {
                        "petstore_auth": [
                            "write:pets",
                            "read:pets"
                        ]
                    }
                ]
            }
        },
        "/pet/findByTags": {
            "get": {
                "tags": [
                    "pet"
                ],
                "summary": "Finds Pets by tags",
                "description": "Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.",
                "operationId": "findPetsByTags",
                "produces": [
                    "application/xml",
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "tags",
                        "in": "query",
                        "description": "Tags to filter by",
                        "required": true,
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "collectionFormat": "multi"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Pet"
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid tag value"
                    }
                },
                "security": [
                    {
                        "petstore_auth": [
                            "write:pets",
                            "read:pets"
                        ]
                    }
                ],
                "deprecated": true
            }
        }*/
    },

    /**
     * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securityDefinitionsObject
     * Security scheme definitions that can be used across the specification.
     */
    "securityDefinitions": {
        /**"petstore_auth": {
            "type": "oauth2",
            "authorizationUrl": "http://petstore.swagger.io/oauth/dialog",
            "flow": "implicit",
            "scopes": {
                "write:pets": "modify pets in your account",
                "read:pets": "read your pets"
            }
        },*/
        "api_key": {
            "type": "apiKey",
            "name": "access-token",
            "in": "header"
        }
    },


    /**
     * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#definitionsObject
     * An object to hold data types produced and consumed by operations.
     */
    "definitions": {
        /**
         * "Order": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "petId": {
                    "type": "integer",
                    "format": "int64"
                },
                "quantity": {
                    "type": "integer",
                    "format": "int32"
                },
                "shipDate": {
                    "type": "string",
                    "format": "date-time"
                },
                "status": {
                    "type": "string",
                    "description": "Order Status",
                    "enum": [
                        "placed",
                        "approved",
                        "delivered"
                    ]
                },
                "complete": {
                    "type": "boolean",
                    "default": false
                }
            },
            "xml": {
                "name": "Order"
            }
        },
        "Category": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "name": {
                    "type": "string"
                }
            },
            "xml": {
                "name": "Category"
            }
        },
        "User": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "username": {
                    "type": "string"
                },
                "firstName": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "phone": {
                    "type": "string"
                },
                "userStatus": {
                    "type": "integer",
                    "format": "int32",
                    "description": "User Status"
                }
            },
            "xml": {
                "name": "User"
            }
        },
        "Tag": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "name": {
                    "type": "string"
                }
            },
            "xml": {
                "name": "Tag"
            }
        },
        "Pet": {
            "type": "object",
            "required": [
                "name",
                "photoUrls"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "category": {
                    "$ref": "#/definitions/Category"
                },
                "name": {
                    "type": "string",
                    "example": "doggie"
                },
                "photoUrls": {
                    "type": "array",
                    "xml": {
                        "name": "photoUrl",
                        "wrapped": true
                    },
                    "items": {
                        "type": "string"
                    }
                },
                "tags": {
                    "type": "array",
                    "xml": {
                        "name": "tag",
                        "wrapped": true
                    },
                    "items": {
                        "$ref": "#/definitions/Tag"
                    }
                },
                "status": {
                    "type": "string",
                    "description": "pet status in the store",
                    "enum": [
                        "available",
                        "pending",
                        "sold"
                    ]
                }
            },
            "xml": {
                "name": "Pet"
            }
        },
        "ApiResponse": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer",
                    "format": "int32"
                },
                "type": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            }
        }*/
    },

    /**
     * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#externalDocumentationObject
     * Additional external documentation.
     */
    "externalDocs": {
        "description": "Find out more about Swagger",
        "url": "http://swagger.io"
    }


















}