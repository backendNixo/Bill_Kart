import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documents",
            version: "1.0.0",
            description: "API documentation for your project",
        },
        servers: [
            {
                url: "http://192.168.1.56:9000/",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [""],
            },
        ],
    },
    apis: [
        "./routes/admin/admin.route.js",
        "./routes/test.route.js",
        "./routes/users/redeeme.route.js",
        "./routes/admin/offer.route.js",
        "./routes/users/offer.routes.js",
        "./routes/admin/api.route.js",
        "./routes/admin/notification.route.js",
        "./routes/admin/service.route.js",
        "./routes/services/broadband/broadband.routes.js",
        "./routes/services/cable/cable.route.js",
        "./routes/services/creditCardPay/creditCard.route.js",
        "./routes/services/datacardPrepaid/dataCard.route.js",
        "./routes/services/donation/donation.route.js",
        "./routes/services/DTH/dth.route.js"
    ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);


export { swaggerSpec }