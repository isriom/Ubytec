using System.Text.Json;
using System.Text.Json.Serialization;
using GlobalData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        //logica para insertar en la base de datos 
        var administrador = _context.Gerentes.First(administrador => administrador.Usuario == HttpContext.User.Identity.Name);
        
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
    public ActionResult Asignar(string id)
    {
        if (id == "") return new BadRequestResult();
        this._psqlConnection.Open();
        var procedure = new NpgsqlCommand("CALL AsignarRepartidorProcedure ($1)", _psqlConnection)
        {
            Parameters = { new NpgsqlParameter { Value = id } }
        };
        procedure.CommandType = System.Data.CommandType.StoredProcedure;
        procedure.ExecuteNonQuery();

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
                var listaTelG = _context.TelefonoGerentes.Where(x=> x.Usuario == HttpContext.User.Identity.Name).ToList();
                return Json(listaTelG, options);
            case "Administrador":
                var Admin = _context.Gerentes.Where(x=> x.Usuario == HttpContext.User.Identity.Name);
                return Json(Admin, options);
           
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
                Admin.Contraseña = updateAdmin.Contraseña;
                Admin.Provincia = updateAdmin.Provincia;
                Admin.Canton = updateAdmin.Canton;
                Admin.Distrito = updateAdmin.Distrito;
                _context.SaveChanges();
                return Ok();
            
            case "TelefonoG":
                //logica de Telefono
                var updateTel = element.Deserialize<TelefonoGerente>();
                var tel = _context.TelefonoGerentes.Find(updateTel.Telefono);
                tel.Telefono = updateTel.Telefono;
                tel.Usuario = updateTel.Usuario;
                _context.SaveChanges();
                return Ok();


            /*
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
                */
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

