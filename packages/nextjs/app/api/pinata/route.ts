import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT || "",
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY || "",
});

export async function POST(request: NextRequest) {
  try {
    // Check content type to determine if we are uploading a file or JSON
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json(
          { error: "No file provided in form data" },
          { status: 400 }
        );
      }

      const upload = await pinata.upload.file(file);
      return NextResponse.json({ cid: upload.cid, ipfsUrl: `ipfs://${upload.cid}` }, { status: 200 });
    } else if (contentType.includes("application/json")) {
      const jsonData = await request.json();

      const upload = await pinata.upload.json(jsonData);
      return NextResponse.json({ cid: upload.cid, ipfsUrl: `ipfs://${upload.cid}` }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Unsupported content type. Use multipart/form-data for files and application/json for metadata." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Pinata upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload to Pinata" },
      { status: 500 }
    );
  }
}
