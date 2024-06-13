using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.User;
using api.Models;

namespace api.Mappers
{
    public static class UserMappers
    {
        public static UserDto ToUserDto(this User userModel)
        {
            return new UserDto
            {
                UserId = userModel.UserId,
                FullName = userModel.FullName,
                EmailAddress = userModel.EmailAddress,
                Password = userModel.Password
            };
        }

        public static User ToUserFromCreateDTO(this CreateUserRequestDto userDto)
        {
           return new User
           {
                FullName = userDto.FullName,
                EmailAddress = userDto.EmailAddress,
                Password = userDto.Password
           };
        }
    }
}