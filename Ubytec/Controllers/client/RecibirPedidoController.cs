using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ubytec.Models;
using Ubytec.Services;

namespace Ubytec.Controllers.client
{
    [Route("Cliente/Comentarios")]
    [ApiController]
    [Authorize(Roles = "Cliente")]
    public class RecibirPedidoController : Controller
    {
        private readonly ComentarioService _comentarioService;

        public RecibirPedidoController(ComentarioService comentarioService) => _comentarioService = comentarioService;

        [HttpGet]
        public async Task<List<Comentario>> Get() => await _comentarioService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Comentario>> Get(string id)
        {
            var comentario = await _comentarioService.GetAsync(id);

            if (comentario is null)
            {
                return NotFound();
            }

            return comentario;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Comentario nuevoComentario)
        {
            await _comentarioService.CreateAsync(nuevoComentario);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Comentario comentarioActualizado)
        {
            var comentario = await _comentarioService.GetAsync(id);

            if (comentario is null)
            {
                return NotFound();
            }

            comentarioActualizado.Id = comentario.Id;

            await _comentarioService.UpdateAsync(id, comentarioActualizado);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var comentario = await _comentarioService.GetAsync(id);

            if (comentario is null)
            {
                return NotFound();
            }

            await _comentarioService.RemoveAsync(id);

            return NoContent();
        }
    }
}
