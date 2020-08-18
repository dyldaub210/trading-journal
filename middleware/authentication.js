const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (request, response, next) => {

    const token = request.header('x-auth-token');
    if (!token) {
        return response.status(401).json({
            msg: 'No token. Authorization denied.'
        });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtToken'));
        request.user = decoded.user;
        next();
    } catch (error) {
        console.log(error.message);
        response.send(401).json({
            msg: 'Token is not valid.'
        })
    }
}
