import multer from "multer";
import mime from "mime";

import { randomUUID } from "node:crypto";

export const generatePhotoFilename = (mimeType: string) => {
    const randomFilename = `${randomUUID()}-${Date.now()}`;
    const fileExtension = mime.getExtension(mimeType);
    const filename = `${randomFilename}.${fileExtension}`;

    return filename;
};

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (request, file, callback) => {
        return callback(null, generatePhotoFilename(file.mimetype));
    },
});

const MAX_SIZE_IN_MEGABYTES = 6 * 1024 * 1024;

export const multerOptions = {
    limits: {
        fileSize: MAX_SIZE_IN_MEGABYTES,
    },
};

export const initMulterMiddleware = () => {
    return multer({ storage, ...multerOptions });
};
