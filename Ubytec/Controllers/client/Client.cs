using System.Data;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using ClientData;
using GlobalData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using Npgsql;
using NuGet.Protocol;
using Ubytec.Models;
using Ubytec.ViewModels;

namespace Ubytec.Controllers.client;

/**
 * Autorization and authentication required
 */
[ApiController]
[Authorize(Roles = "Cliente")]
/*
 * Controller class to client manage WebApp
 */
public class Client : Controller
{
    private readonly ubytecContext _context;

    private readonly NpgsqlConnection _psqlConnection;
    
    private JsonSerializerOptions options = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
        ReferenceHandler = ReferenceHandler.IgnoreCycles,
        PropertyNamingPolicy = null,
    };

    public Client(ubytecContext context)
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
        var cliente = _context.Clientes.First(cliente => cliente.Usuario == HttpContext.User.Identity.Name);

        switch (web)
        {
            case "buy":
                //logica de citas
                // trnasfomar el json a un objeto especial dado que en el no se encuentra el id del cliente
                var order = element.Deserialize<ClientData.Order>(options);
                // revisar que sea valido
                if (order == null) return BadRequest();
                if (order.Products.Count == 0) return BadRequest();
                // crear el modelo del contexto apartir del objeto especial, este modelo aun no esta incluido en la base de datos
                var OrderModel = order.ToModel();
                OrderModel.CedulaCliente = cliente.Cedula;
                // agregar el modelo al contexto
                _context.Pedidos.Add(OrderModel);
                // guardar los cambios del contexto en la base de datos
                _context.SaveChanges();
                this._psqlConnection.Open();
                var procedure = new NpgsqlCommand("CALL public.calcularprecio('"+order.ComprobantePago+"');", _psqlConnection);
                procedure.CommandType = CommandType.Text;
                procedure.ExecuteNonQuery();
                this._psqlConnection.Close();
                return Ok();


            case "Direccion":
                //logica de Dirreccion
                
                return Ok();

            case "Telefono":
                //logica de Telefono
                var tel = element.Deserialize<TelefonoCliente>(options);
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
        var listTest = Array.Empty<Element>();
        Console.Out.Write(" consult: " + JsonSerializer.Serialize(web));
        var user = _context.Clientes.First(cliente => cliente.Usuario == HttpContext.User.Identity.Name);

        switch (web)
        {
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

        return Json(listTest);
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
            case "RClientes":
                //logica de Clientes
                var update = element.Deserialize<AdminData.ClienteElement>();
                var cliente = _context.Clientes.Find(update.cedula);
                update.UpdateModel(cliente);
                _context.SaveChanges();
                return Ok();
            case "Usuario":
                //logica de Insumos
                var updateCliente = element.Deserialize<AdminData.ClienteElement>();
                var cliente1 = _context.Clientes.Find(updateCliente.cedula);
                updateCliente.UpdateModel(cliente1);
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
                var toDeleteAddres = _context.ClienteDireccions.Find(element);
                _context.ClienteDireccions.Remove(toDeleteAddres);
                _context.SaveChanges();
                return new OkResult();
            case "Telefono":
                //logica de Telefono
                var toDeletePhone = _context.ClienteTelefonos.Find(element);
                _context.ClienteTelefonos.Remove(toDeletePhone);
                _context.SaveChanges();
                return new OkResult();

        }
        */
        return new OkResult();
    }
}