export const asyncHandler = (fn) =>
    (req, res, next) =>
        Promise.resolve(fn(req, res, next)).then((val) => {
            res.status(200).send(val)
        }).catch(next)