import jwt from "jsonwebtoken";

export const verifyToken = function (req, res, next) {
    const authToken = req.headers.authorization
    if (authToken) {
        const token = authToken.split(" ")[1]
        try {
            const deacodedPayload = jwt.verify(token, process.env.JWT_SECRIT)
            req.user = deacodedPayload
            next()
        }
        catch (error) {
            return res.status(401).json({ message: "invaled token, access denied" })
        }
    }
    else {
        return res.status(401).json({ message: "no token provider, access denied" })
    }
}

export const verifyTokenAndAdmin = function (req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            return res.status(403).json({ message: "not allowed, only admin" })
        }
    })
}

export const verifyTokenAndOnlyUser = function (req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id = req.params.id) {
            next()
        }
        else {
            return res.status(403).json({ message: "not allowed, only user himself" })
        }
    })
}

export const verifyTokenAndAuthorization = function (req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id = req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            return res.status(403).json({ message: "not allowed, only user himself or admin" })
        }
    })
}