using System.Text.Json;
using System.Text.Json.Serialization;
using GlobalData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ubytec.Models;

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


            case "Direccion":
                //logica de Dirreccion
                return Ok();

            case "Telefono":
                //logica de Telefono
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
        /*
        switch (web)
        {
            case "RCitas":
                //logica de citas
                var updater = element.Deserialize<AdminData.CitaElement>();
                var cita = _context.Cita.Find(updater.placa, updater.fecha, updater.sucursal);
                updater.cedula = cita.Cedula;
                updater.nombre = cita.Nombre;
                updater.monto = (int)cita.Monto;
                updater.iva = (int)cita.Iva;
                _context.SaveChanges();
                updater.UpdateModel(cita);
                return Ok();
            case "RAdmines":
                //logica de Admines
                var update = element.Deserialize<AdminData.AdmineElement>();
                var Admine = _context.Admines.Find(update.cedula);
                update.UpdateModel(Admine);
                _context.SaveChanges();
                return Ok();
            case "Usuario":
                //logica de Insumos
                var updateAdmine = element.Deserialize<AdminData.AdmineElement>();
                var Admine1 = _context.Admines.Find(updateAdmine.cedula);
                updateAdmine.UpdateModel(Admine1);
                _context.SaveChanges();
                return Ok();
        }
        */
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
        //logica para borrar una cita
        Console.Out.Write("Delete: " + element[0]);
        /*
        switch (web)
        {
            case "RCitas":
                //logica de citas
                var cita = _context.Cita.ToArray().First(x => x.Placa.ToString() == element[1] && x.Fecha.ToString(CultureInfo.InvariantCulture) == element[0] && x.Sucursal == element[2]);
                _context.Cita.Remove(cita);
                _context.SaveChanges();
                return new OkResult();
            case "Direccion":
                //logica de Direccion
                var toDeleteAddres = _context.AdmineDireccions.Find(element);
                _context.AdmineDireccions.Remove(toDeleteAddres);
                _context.SaveChanges();
                return new OkResult();
            case "Telefono":
                //logica de Telefono
                var toDeletePhone = _context.AdmineTelefonos.Find(element);
                _context.AdmineTelefonos.Remove(toDeletePhone);
                _context.SaveChanges();
                return new OkResult();

        }
        */
        return new OkResult();
    }
}