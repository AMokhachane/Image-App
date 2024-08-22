using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Models;
using Azure.Identity;

namespace api.Mappers
{
    public static class CommentMapper
    {
       public static CommentDto ToCommentDto(this Comment commentModel)
       {
         return new CommentDto
         {
            CommentId = commentModel.CommentId,
            Content = commentModel.Content,
            CreatedOn = commentModel.CreatedOn,
            ImageId = commentModel.ImageId,
            CreatedBy = commentModel.AppUser.UserName

         };
       } 

       public static Comment ToCommentFromCreate(this CreateCommentDto commentDto, int imageId)
       {
         return new Comment
         {
           
            Content = commentDto.Content,
            ImageId = imageId,
            //  AppUserId = commentDto.AppUserId // Ensure this line is mapping correctly

         };
       } 

       public static Comment ToCommentFromUpdate(this UpdateCommentRequestDto commentDto)
       {
         return new Comment
         {
           
            Content = commentDto.Content,
         };
       } 
    }
}