using System.Text.Json;
using System.Text.Json.Serialization;
using GlobalData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ubytec.Models;
using Npgsql;

namespace Ubytec.Controllers.Admin;

/**
 * Autorization and authentication required
 */
[ApiController]
[Authorize(Roles = "Trabajador")]
/*
 * Controller class to Admin manage WebApp
 */
public class Admin : Controller
{
    private readonly ubytecContext _context;
    private readonly NpgsqlConnection _psqlConnection;

    private JsonSerializerOptions options = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
        ReferenceHandler = ReferenceHandler.IgnoreCycles,
        PropertyNamingPolicy = null,
    };

    public Admin(ubytecContext context)
    {
        Element.Context = context;
        _context = context;
        _psqlConnection =
            new NpgsqlConnection(
                "Host=ubytec.postgres.database.azure.com;Database=ubytec;Username=ubytec@ubytec;Password=CE3110.2022.2");
    }

    /**
     * Add cite to DB
     * Recieve a @CODE {Admin.CitaElement} and add it to the DB
     */
    [HttpPut]
    [Route("api/[controller]/{web}/add")]
    public ActionResult Register([FromBody] JsonElement element, string web)
    {
        switch (web)
        {
            case "Repartidor":
                var Rep = element.Deserialize<Repartidor>(options);
                _context.Repartidors.Add(Rep);
                _context.SaveChanges();
                return Ok();

            case "Administrador":
                //logica para registrar un admin
                var Admin = element.Deserialize<Gerente>(options);
                _context.Gerentes.Add(Admin);
                _context.SaveChanges();
                return Ok();

            case "TelefonoG":
                //logica para agregar un Telefono a un Gerente
                var tel = element.Deserialize<TelefonoGerente>(options);
                _context.TelefonoGerentes.Add(tel);
                _context.SaveChanges();
                return Ok();

            case "Afiliado":
                //logica para agregar un afiliado
                var Afil = element.Deserialize<Afiliado>(options);
                _context.Afiliados.Add(Afil);
                _context.SaveChanges();
                return Ok();


            case "TelefonoA":
                //logica de Telefono
                var telA = element.Deserialize<TelefonoAfiliado>(options);
                _context.TelefonoAfiliados.Add(telA);
                _context.SaveChanges();
                return Ok();

            case "TelefonoR":
                //logica de Telefono
                var telR = element.Deserialize<TelefonoRepartidor>(options);
                _context.TelefonoRepartidors.Add(telR);
                _context.SaveChanges();
                return Ok();

        }

        Console.Out.Write(element);
        Console.Out.Write(JsonSerializer.Serialize(element));
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
        //Logica para obtener la lista
        switch (web)
        {
            case "ConsolidadoVentas":
                return Json(_context.ConsolidadoVentas.ToList().GroupBy(x => x.Cliente), options);

            case "ReporteRepartidor":
                return Json(_context.RepartidoresPagos.ToList().GroupBy(x => x.Repartidor), options);

            case "VentasAfiliado":
                return Json(_context.VentasAfiliados.ToList().GroupBy(x => x.Afiliado), options);

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
                var listaTelG = _context.TelefonoGerentes.Where(x => x.Usuario == id).ToList();
                return Json(listaTelG, options);

            case "Administrador":
                var Admin = _context.Gerentes.Where(x => x.Usuario == id).ToList();
                return Json(Admin, options);

            case "TelefonoA":
                var listaTelA = _context.TelefonoAfiliados.Where(x => x.CedulaJuridica == id).ToList();
                return Json(listaTelA, options);

            case "Afiliado":
                var Afiliado = _context.Afiliados.Where(x => x.CedulaJuridica == id).ToList();
                return Json(Afiliado, options);

            case "Repartidor":
                if (id != null && id2 != null && id3 != null)
                {
                }

                if (id != null && id2 != null)
                {
                }

                if (id != null)
                {
                    var Repartidor = _context.Repartidors.Find(id);
                    return Json(Repartidor, options);
                }

                return Json(_context.Repartidors.ToList(), options);
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
        Console.Out.Write("update: ");
        switch (web)
        {
            case "Administrador":
                //logica para actualizar un admin
                var updateAdmin = element.Deserialize<Gerente>();
                var Admin = _context.Gerentes.Find(updateAdmin.Usuario);
                Admin.NombreCompleto = updateAdmin.NombreCompleto;
                Admin.Provincia = updateAdmin.Provincia;
                Admin.Canton = updateAdmin.Canton;
                Admin.Distrito = updateAdmin.Distrito;
                Admin.CedulaJuridica = updateAdmin.CedulaJuridica;
                _context.SaveChanges();
                return Ok();

            case "Afiliado":
                //logica para actualizar un admin
                var updateAfil = element.Deserialize<Afiliado>();
                var Afil = _context.Afiliados.Find(updateAfil.CedulaJuridica);
                Afil.Nombre = updateAfil.Nombre;
                Afil.Distrito = updateAfil.Distrito;
                Afil.Canton = updateAfil.Canton;
                Afil.Provincia = updateAfil.Provincia;
                Afil.Correo = updateAfil.Correo;
                Afil.Sinpe = updateAfil.Sinpe;
                Afil.Estado = updateAfil.Estado;
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

            case "Repartidor":
                var updateRep = element.Deserialize<Repartidor>();
                var Rep = _context.Repartidors.Find(updateRep.Cedula);
                Rep.NombreCompleto = updateRep.NombreCompleto;
                Rep.Provincia = updateRep.Provincia;
                Rep.Canton = updateRep.Canton;
                Rep.Distrito = updateRep.Distrito;
                Rep.Usuario = updateRep.Distrito;
                Rep.Contraseña = updateRep.Distrito;
                Rep.Correo = updateRep.Distrito;
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
    public ActionResult Delete([FromBody] string[] element, string web)
    {
        //logica para borrar 
        Console.Out.Write("Delete: " + element[0]);
        switch (web)
        {
            case "Administrador":
                //logica para borrar un admin
                var todeleteadmin = _context.Gerentes.Find(element[0]);
                _context.Gerentes.Remove(todeleteadmin);
                _context.SaveChanges();
                return Ok();

            case "TelefonoG":
                //logica de borrar un telefono
                var deletetel = _context.TelefonoGerentes.Find(element);
                _context.TelefonoGerentes.Remove(deletetel);
                _context.SaveChanges();
                return Ok();

            case "Afiliado":
                //logica para borrar un admin
                var todeleteafil = _context.Afiliados.Find(element[0]);
                _context.Afiliados.Remove(todeleteafil);
                _context.SaveChanges();

                return Ok();

            case "TelefonoA":
                //logica de borrar un telefono
                var deletetelA = _context.TelefonoAfiliados.Find(element);
                _context.TelefonoAfiliados.Remove(deletetelA);
                _context.SaveChanges();
                return Ok();

            case "Repartidor":
                //logica para borrar un admin
                var todeleterep = _context.Repartidors.Find(element[0]);
                _context.Repartidors.Remove(todeleterep);
                _context.SaveChanges();
                return Ok();

            case "TelefonoR":
                //logica de borrar un telefono
                var deletetelR = _context.TelefonoRepartidors.Find(element);
                _context.TelefonoRepartidors.Remove(deletetelR);
                _context.SaveChanges();
                return Ok();
        }

        return new OkResult();
    }
}