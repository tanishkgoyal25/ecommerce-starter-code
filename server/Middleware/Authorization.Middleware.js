const Authorization = (...Roles) => {
     return (request, response, next) => {
          try {
               if (!request.user) {
                    return response.status(401).json(
                         {
                              Status: false,
                              Message: "Access Denied."
                         }
                    )
               }

               if (!request.user.Role) {
                    return response.status(401).json(
                         {
                              Status: false,
                              Message: "Access Denied. Invalid Role."
                         }
                    )
               }

               if (!Roles.includes(request.user.Role)) {
                    return response.status(403).json(
                         {
                              Status: false,
                              Message: "Access Denied. Invalid Role."
                         }
                    )
               }

               next();
          } catch (error) {
               next(error);
          }
     }
}

module.exports = { Authorization };