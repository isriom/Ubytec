using System.Data;
using System.Text.Json;
using System.Text.Json.Serialization;
using GlobalData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Ubytec.Models;

namespace Ubytec.Controllers.afiliado;

/**
 * Autorization and authentication required
 */
[ApiController]
[Authorize(Roles = "Afiliado")]
/*
 * Controller class to Admin manage WebApp
 */
public class Afiliado : Controller
{
    private readonly ubytecContext _context;
    private readonly NpgsqlConnection _psqlConnection;

    private JsonSerializerOptions options = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
        ReferenceHandler = ReferenceHandler.IgnoreCycles,
        PropertyNamingPolicy = null,
    };

    public Afiliado(ubytecContext context)
    {
        Element.Context = context;
        _context = context;
        _psqlConnection =
            new NpgsqlConnection(
                "Host=ubytec.postgres.database.azure.com;Port=5432;Database=ubytec;Username=ubytec@ubytec;Password=CE3110.2022.2");
    }

    /**
     * Add cite to DB
     * Recieve a @CODE {Admin.CitaElement} and add it to the DB
     */
    [HttpPut]
    [Route("api/[controller]/{web}/add")]
    public ActionResult Register([FromBody] JsonElement element, string web)
    {
        //logica para insertar en la base de datos 
        var administrador =
            _context.Gerentes.First(administrador => administrador.Usuario == HttpContext.User.Identity.Name);

        switch (web)
        {
            case "Administrador":
                //logica para crear un admin
                var Admin = element.Deserialize<Gerente>(options);
                _context.Gerentes.Add(Admin);
                _context.SaveChanges();
                return Ok();


            case "TelefonoG":
                //logica de Telefono
                var tel = element.Deserialize<TelefonoGerente>(options);
                _context.TelefonoGerentes.Add(tel);
                _context.SaveChanges();
                return Ok();
        }

        Console.Out.Write(element);
        Console.Out.Write(JsonSerializer.Serialize(element));
        return new OkResult();
    }

    [HttpPut]
    [Route("api/[controller]/{web}/Asignar/{id}")]
    public ActionResult Asignar([FromBody] JsonElement element, string id, string? web)
    {
        if (id == "") return new BadRequestResult();
        this._psqlConnection.Open();
        var procedure = new NpgsqlCommand("CALL public.asignarrepartidorprocedure('"+id+"');", _psqlConnection);
        procedure.CommandType = CommandType.Text;
        procedure.ExecuteNonQuery();
        this._psqlConnection.Close();

        return new OkResult();
    }

    /**
     * Get the list of cites with their data
     * Send the cites list with their as a JSON using the @CODE {Admin.CitaElement} as template
     */
    [HttpGet]
    [Route("api/[controller]/{web}/list")]
    [Route("api/[controller]/{web}/list/{id}")]
    [Route("api/[controller]/{web}/list/{id}/{id2}")]
    [Route("api/[controller]/{web}/list/{id}/{id2}/{id3}")]
    public ActionResult Consult(string web, string? id, string? id2, string? id3)
    {
        var Admin = _context.Gerentes.Where(x => x.Usuario == HttpContext.User.Identity.Name);
        //Logica para obtener la lista
        switch (web)
        {
            case "Pedidos":
                var Pedidos = _context.Pedidos.Where(x =>
                    x.CedulaJafiliado == Admin.First().CedulaJuridica).ToList().GroupBy(x => x.EstadoPedido).Reverse();
                return Json(Pedidos, serializerSettings: options);

            case "ProductosPedido":
                var PedidosToSearch = _context.Pedidos.Include(x => x.ProductoPedidos)
                    .FirstOrDefault(x => x.CedulaJafiliado == Admin.First().CedulaJuridica && x.ComprobantePago == id);
                var ProductoPedidos = PedidosToSearch?.ProductoPedidos.ToList();
                return Json(ProductoPedidos, options);

            case "ConsolidadoVentas":
                return Json(_context.ConsolidadoVentas.ToList().GroupBy(x => x.Cliente), options);

            case "Afiliados":
                //logica de Puntos
                //lista de afiliados validados
                var listAfiliados = _context.Afiliados.Where(x => x.Estado == "APROBADA").ToList();
                // lista de fotos del producto; id=afiliado, id2=producto
                if (id != null && id2 != null)
                {
                    var selectedafiliate = listAfiliados.First(x => x.Nombre == id);
                    var selectedproduct = _context.Productos.First(x =>
                        x.NombreProducto == id2 && x.CedulaJafiliado == selectedafiliate.CedulaJuridica);

                    return Json(_context.FotosProductos
                        .Where(x => x.CedulaJafiliado == selectedafiliate.CedulaJuridica &&
                                    x.NombreProducto == selectedproduct.NombreProducto).Select(x => x.Urlfoto)
                        .ToArray());
                }

                // lista de productos; id=afiliado
                if (id != null)
                {
                    var selectedafiliate = listAfiliados.First(x => x.Nombre == id);
                    return Json(_context.Productos.Where(x => x.CedulaJafiliado == selectedafiliate.CedulaJuridica),
                        options);
                }

                // lista de afiliados
                return Json(listAfiliados, options);

            case "TelefonoG":
                var listaTelG = _context.TelefonoGerentes.Where(x=> x.Usuario == HttpContext.User.Identity.Name)
                    .ToList();
                return Json(listaTelG, options);
            
            case "Administrador":
                var Administradores = _context.Gerentes.Where(x => x.CedulaJuridica == Admin.First().CedulaJuridica)
                    .ToList();
                return Json(Administradores, options);
        }

        return Json("No se encontro la lista", options);
    }

    /**
     * Function to update a cite
     * Update all the element atributes with the new values; In case that ald and new value are the same still update it.
     */
    [HttpPost]
    [Route("api/[controller]/{web}/update")]
    public ActionResult Update([FromBody] JsonElement element, string web)
    {
        Console.Out.Write("update:" + element);
        
        Console.Out.Write("update: ");

        switch (web)
        {
            case "Administrador":
                //logica para actualizar un admin
                var updateAdmin = element.Deserialize<Gerente>();
                var Admin = _context.Gerentes.Find(updateAdmin.Usuario);
                Admin.NombreCompleto = updateAdmin.NombreCompleto;
                Admin.Contraseña = updateAdmin.Contraseña;
                Admin.Provincia = updateAdmin.Provincia;
                Admin.Canton = updateAdmin.Canton;
                Admin.Distrito = updateAdmin.Distrito;
                _context.SaveChanges();
                return Ok();

            case "TelefonoG":
                //logica de actualizacion de Telefono
                var updateTel = element.Deserialize<TelefonoGerente>();
                var tel = _context.TelefonoGerentes.Find(updateTel.Telefono);
                tel.Telefono = updateTel.Telefono;
                tel.Usuario = updateTel.Usuario;
                _context.SaveChanges();
                return Ok();
            
        }

        Console.Out.Write("update: " + JsonSerializer.Serialize(element));

        return new AcceptedResult();
    }

    /**
     * Function to delete a cite
     * Recieve a Element and erase it from the DB
     */
    [HttpDelete]
    [Route("api/[controller]/{web}/delete")]
    public ActionResult Delete([FromBody]  string[] element, string web)
    {
        Console.Out.Write("Delete: " + element[0]);
        switch (web)
        {
            case "Administrador":
                //logica para borrar un admin
                var todeleteadmin = _context.Gerentes.Find(element);
                _context.Gerentes.Remove(todeleteadmin);
                _context.SaveChanges();
                return Ok();
            
            case "TelefonoG":
                //logica de borrar un telefono
                var deletetel = _context.TelefonoGerentes.Find(element);
                _context.TelefonoGerentes.Remove(deletetel);
                _context.SaveChanges();
                return Ok();
            
        }
        
        return new OkResult();
    }

    [HttpPut]
    [Route("api/[controller]/{web}/solicitud")]
    [AllowAnonymous]
    public ActionResult Solicitud([FromBody] JsonElement element, string web)
    {
        switch (web)
        {
            case "Afiliado":
                //logica para crear un afiliado
                var newAfil = element.Deserialize<Models.Afiliado>(options);
                _context.Afiliados.Add(newAfil);
                _context.SaveChanges();
                return Ok();


            case "Admin":
                //logica para crear un admin
                var newAdmin = element.Deserialize<Gerente>(options);
                _context.Gerentes.Add(newAdmin);
                _context.SaveChanges();
                return Ok();

            case "TelefonoA":
                //logica de Telefono Afiliado
                var telA = element.Deserialize<TelefonoAfiliado>(options);
                _context.TelefonoAfiliados.Add(telA);
                _context.SaveChanges();
                return Ok();

            case "TelefonoG":
                //logica de Telefono del Administrador
                var tel = element.Deserialize<TelefonoGerente>(options);
                _context.TelefonoGerentes.Add(tel);
                _context.SaveChanges();
                return Ok();
        }
        return Ok();
    }
}