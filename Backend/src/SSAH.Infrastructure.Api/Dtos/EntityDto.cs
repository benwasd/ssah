using System;

namespace SSAH.Infrastructure.Api.Dtos
{
    public class EntityDto
    {
        public Guid Id { get; set; }

        public byte[] RowVersion { get; set; }
    }
}