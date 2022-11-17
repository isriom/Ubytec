using System.Security.Claims;
using System.Text.Json;
using GlobalData;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ubytec.Models;
using Ubytec.ViewModels;

namespace Ubytec.Controllers;

[ApiController]
/*
 * Clase Controladora del componente del Login de la Pagina
 */
public class LoginController : Controller
{
    private readonly ubytecContext _context;

    public LoginController(ubytecContext context)
    {
        Element.Context = context;
        _context = context;
    }

    /**
     * Metodo donde se realiza la autorizacion de los usuarios cuando se presiona el boton de Sign In
     */
    [AllowAnonymous]
    [HttpPut]
    [Route("/api/Signin")]
    public async Task<ActionResult> Login(Data.LoginUser data)
    {
        var rol = await AuthenticateUser(data);
        await Console.Out.WriteAsync(JsonSerializer.Serialize(data) + "\n");
        if (rol == "No Found")
        {
            await Console.Out.WriteAsync("No found");
            return NotFound(data);
        }

        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, data.username),
            new(ClaimTypes.Role, rol)
        };
        var claimIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimIdentity), new AuthenticationProperties
            {
                IsPersistent = false,
                RedirectUri = "", AllowRefresh = false
            });

        await Console.Out.WriteAsync(JsonSerializer.Serialize(
            HttpContext.Request.Cookies));
        return Content(JsonSerializer.Serialize(
            claims[1].Value)
        );
    }

    /**
     * Metodo que realiza la autenticacion del usuario
     */
    private Task<string> AuthenticateUser(Data.LoginUser user)
    {
        //Debug to access with default user and password delete this in production
        switch (user.role)
        {
            case "Trabajador":
                if (user.username == "admin" && user.password == "admin")
                {
                    return Task.FromResult("Trabajador");
                }
                return Task.FromResult("No Found");
                
            case "Cliente":
                var cuser = _context.Clientes.FirstOrDefault(t => t.Usuario == user.username);
                return Task.FromResult(cuser?.Contraseña == user.password ? "Cliente" : "No Found");

            case "Afiliado":
                var auser = _context.Gerentes.FirstOrDefault(t => t.Usuario == user.username);
                return Task.FromResult(auser?.Contraseña == user.password ? "Afiliado" : "No Found");
            default:
                return Task.FromResult("No Found");
        }
    }


    /**
 * Metodo que determina la accion al presionar el boton de Log Out
 */
    [AllowAnonymous]
    [HttpPut]
    [Route("/logout")]
    public async Task<ActionResult> Logout(Data.LoginUser? data)
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        if (HttpContext.Request.Cookies.ContainsKey(".AspNetCore.Cookies"))
            HttpContext.Response.Cookies.Delete(".AspNetCore.Cookies");

        await Console.Out.WriteAsync("Log out");
        return Content(JsonSerializer.Serialize(
            new Data.LoginUser()));
    }
}