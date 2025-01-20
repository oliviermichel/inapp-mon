// for method GET
export async function GET() {
    var data = {
        message: 'result from get'
    }

    return Response.json({ data })
}

// for method POST
export async function POST() {
    var data = {
        message: 'result from post'
    }

    return Response.json({ data })
}