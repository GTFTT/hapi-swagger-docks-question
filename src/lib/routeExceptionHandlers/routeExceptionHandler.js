'use strict';

module.exports = async ({handler}, request, h) => {
    try {
        return await handler(request, h);
    } catch (err) {
        request.server.log(['error'], err);
        return err;
    }
};