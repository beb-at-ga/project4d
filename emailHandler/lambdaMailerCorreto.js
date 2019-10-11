const aws = require('aws-sdk')
const ses = new aws.SES()
const getParamsFromUrl = require('./getParamsFromUrl')

module.exports = (options) => {
  const { myEmail, myDomain } = options

  function generateResponse (code, payload) {
    return {
      statusCode: code,
      headers: {
        'Access-Control-Allow-Origin': myDomain,
        'Access-Control-Allow-Headers': 'x-requested-with',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(payload)
    }
  }

  function generateError (code, err) {
    console.log(err)
    return {
      statusCode: code,
      headers: {
        'Access-Control-Allow-Origin': myDomain,
        'Access-Control-Allow-Headers': 'x-requested-with',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(err.message)
    }
  }

  function generateRedirect (code, redirectUrl) {
    return {
      statusCode: code,
      headers: {
        'Access-Control-Allow-Origin': myDomain,
        'Access-Control-Allow-Headers': 'x-requested-with',
        'Access-Control-Allow-Credentials': true,
        'Location': redirectUrl
      }
    }
  }

  const generateEmailParamsFromUriEncoded  = (body) => {

    const { email, name, subject, content } = getParamsFromUrl(body)
    if (!(email && name && content && subject)) {
      throw new Error('Missing parameters! Make sure to add parameters \'email\', \'name\', \'subject\', \'content\'.')
    }

    const replacedName = name.replace(/\+/g, ' ')
    const replacedContent = content.replace(/\+/g, ' ')

    return {
      Source: myEmail,
      Destination: { ToAddresses: [myEmail] },
      ReplyToAddresses: [email],
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `${replacedContent}`
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${subject}`
        }
      }
    }
  }

  async function sendFormEncoded (event) {
    try {
      const redirectUrl = event.queryStringParameters ? event.queryStringParameters.redirectUrl : event.headers.Referer
      const emailParams = generateEmailParamsFromUriEncoded(event.body)
   
      await ses.sendEmail(emailParams).promise()
   
      return generateRedirect(302, redirectUrl)
   
    } catch (err) {
   
      return generateError(500, err)
   
    }
  }

  return {
    sendFormEncoded
  }
}


