// // app/api/getAccessToken

// import { NextResponse } from "next/server";
// import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

// const GET = withApiAuthRequired(async function GET(req) {
// const res = new NextResponse();
// const { accessToken } = await getAccessToken(req, res, {
// authorizationParams:{
// audience:process.env.AUTH0_AUDIENCE,
// scope: "C2DI Auth API",
// }
// });
// console.log(accessToken);
// return NextResponse.json({ accessToken: accessToken }, res);
// });

// export { GET };