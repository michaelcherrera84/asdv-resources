import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Handles a POST request to generate a signature for the Cloudinary API using the given parameters.
 *
 * @param {Request} request - The incoming HTTP request object containing the request body.
 * @return {Promise<Response>} A promise that resolves to an HTTP response containing the generated signature as JSON.
 */
export async function POST(request: Request) {
    const body = await request.json();
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET!);

    return Response.json({ signature });
}
