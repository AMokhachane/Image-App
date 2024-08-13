using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace api.Extensions
{
    public static class ClaimsExtensions
    {
        public static string GetUserEmail(this ClaimsPrincipal user)
        {
            //this link might have been deprecated so if it does not work, ask chat gpt to give you an update.
            var emailClaim = user.Claims.SingleOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress");
            if (emailClaim == null)
            {
                throw new InvalidOperationException("Email claim not found");
            }
            return emailClaim.Value;
        }

        public static string GetUsername(this ClaimsPrincipal user)
        {
            var claim = user.Claims.SingleOrDefault(x => x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"));
            return claim?.Value ?? "UnknownUser"; // Return a default value if the claim is not found
        }
    }
}

