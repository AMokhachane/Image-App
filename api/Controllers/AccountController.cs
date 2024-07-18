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

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
                if (user == null)
                {
                    return Ok("If your email address is in our system, you will receive a password reset link.");
                }

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                // var resetLink = Url.Action("ResetPassword", "Account", new { token = token, email = forgotPasswordDto.Email }, Request.Scheme);
                var resetLink = $"http://localhost:3000/ResetPassword?token={token}&email={forgotPasswordDto.Email}";

                await _emailSender.SendResetPasswordEmailAsync(forgotPasswordDto.Email, resetLink);

                return Ok("If your email address is in our system, you will receive a password reset link.");
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpGet("ResetPassword")]
        public IActionResult ResetPassword(string token, string email)
        {
            if (token == null || email == null)
            {
                // Handle invalid or missing token/email
                return BadRequest("Token or email missing");
            }

            var model = new ResetPasswordDto { Token = token, Email = email };
            return Ok(model); // Return the model as JSON (or however you prefer to handle it in the frontend)
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null)
            {
                // User not found, but don't reveal this to the client
                return Ok("Password reset successful.");
            }

            var result = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
            if (result.Succeeded)
            {
                return Ok("Password reset successful.");
            }

            return BadRequest("Error resetting password.");
        }
    }
}