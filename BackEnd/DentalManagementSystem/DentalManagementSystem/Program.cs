using DentalManagementSystem.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles); ;



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Database Context

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
});

// Add Authentication
builder.Services.AddAuthentication("Bearer")
        .AddJwtBearer(o =>
        {
            o.RequireHttpsMetadata = true;
            string keyInput = "ASDFGHJKL:}{ POIUYTREWQZXCVBNM<>?+_)(*&^%$#@!)}";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyInput));
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                IssuerSigningKey = key,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidIssuer = "MyApp",
                ValidAudience = "FrontEnd"
            };
        });

// Add Cors

builder.Services.AddCors(c => c.AddPolicy("Default", cp => cp.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseCors("Default");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
