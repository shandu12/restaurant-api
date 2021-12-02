
export const handleErrorMiddleware = async (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err);
}

export class AppError extends Error {

    data: any;
    originalStack: string;
    code: string;
    status: number;


    constructor(code: string, data?: any, status?: number, err: Error = new Error()) {
        super(err.message);
        this.originalStack = err.stack;
        this.code = code;
        this.data = data;
        this.status = status || 500;
        this.setPropertiesDescriptors();
    }

     setPropertiesDescriptors = () => {
        const desc = {
            message: {
                enumerable: true,
                writable: true,
            },
            stack: {
                enumerable: true,
                writable: true,
            },
        };
        Object.defineProperties(this, desc);
    }
}
