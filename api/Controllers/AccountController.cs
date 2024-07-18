using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text; // Add this directive for StringBuilder
using System.Net;


namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signinManager;
        private readonly IEmailSender _emailSender;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, IEmailSender emailSender)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signInManager;
            _emailSender = emailSender;
        }

  [HttpPost("login")]
public async Task<IActionResult> Login(LoginDto loginDto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

    if (user == null)
        return Unauthorized("Username not found and/or password incorrect!");

    if (!await _userManager.IsEmailConfirmedAsync(user))
    {
        return Unauthorized("You must confirm your email before logging in.");
    }

    var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

    if (!result.Succeeded)
        return Unauthorized("Username not found and/or password incorrect");

    return Ok(new NewUserDto
    {
        UserName = user.UserName,
        Email = user.Email,
        Token = _tokenService.CreateToken(user)
    });
}

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var AppUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.EmailAddress
                };

                var createdUser = await _userManager.CreateAsync(AppUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(AppUser, "User");
                    if (roleResult.Succeeded)
                    {
                        var token = await _userManager.GenerateEmailConfirmationTokenAsync(AppUser);
                        var confirmationLink = Url.Action("ConfirmEmail", "Account",
                        new { userId = AppUser.Id, token = token }, Request.Scheme);

                        await _emailSender.SendEmailAsync(AppUser.Email, confirmationLink);

                        return Ok("Registered Sucessfully, Check your EMail");
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
        [HttpGet("ConfirmEmail")]
public async Task<IActionResult> ConfirmEmail(string userId, string token)
{
    if (userId == null || token == null)
    {
        // Handle invalid or missing userId/token
        return BadRequest("UserId or token missing");
    }

    var user = await _userManager.FindByIdAsync(userId);

    if (user == null)
    {
        // Handle user not found
        return BadRequest($"User with Id {userId} not found");
    }

    var result = await _userManager.ConfirmEmailAsync(user, token);

    if (result.Succeeded)
    {
        // Email confirmed successfully, redirect or return appropriate response
        // return Ok("Email confirmed successfully");
        return Redirect("http://localhost:3000/");
    }
    else
    {
        // Handle confirmation failure
        return BadRequest("Error confirming email");
    }
}

        [HttpGet("email-exists")]
        public async Task<IActionResult> EmailExists([FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return Ok(true);
            }
            return Ok(false);
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
                if (user == null)
                    return BadRequest("Email not found");

                var token = _tokenService.CreateToken(user);

                var emailMessage = new StringBuilder();
                emailMessage.AppendLine("You requested a password reset.");
                emailMessage.AppendLine($"<a href='http://localhost:3000/ResetPassword?token={WebUtility.UrlEncode(token)}'>Click here to reset your password</a>");

                //await _emailSender.SendEmailAsync(user.Email, "Password Reset", emailMessage.ToString());

                return Ok(new { message = "Password reset email sent" });
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
                if (user == null)
                    return BadRequest("Invalid token or user does not exist");

                var result = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
                if (result.Succeeded)
                {
                    return Ok(new { message = "Password reset successful" });
                }
                else
                {
                    return StatusCode(500, result.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}