using Azure.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Ubytec.Models;

var builder = WebApplication.CreateBuilder(args);

var keyVaultEndpoint = new Uri(Environment.GetEnvironmentVariable("VaultUri"));
builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());

// Add cookie Authenticationas a default politic
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "";
        options.AccessDeniedPath = "";
    });
//Add cors  
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            //Allow exchange betwen proxy, real server and web browser
            policy.WithOrigins("https://localhost:44460", "https://localhost:40463", "https://localhost:44366",
                "https://localhost:33863").AllowCredentials();
            policy.WithExposedHeaders("*");
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
        });
});


builder.Services.AddHttpContextAccessor();

builder.Services.AddDbContext<ubytecContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("UbyTECDBContext")));

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();
app.UseCookiePolicy(new CookiePolicyOptions());


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
