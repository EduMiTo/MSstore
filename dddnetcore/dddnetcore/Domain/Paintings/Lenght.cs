using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Paintings
{
    public class Lenght : IValueObject
    {

        public double lenght { get; init; }

        public Lenght() { }
        public Lenght(double lenght)
        {

            if (lenght < 0)
            {
                throw new BusinessRuleValidationException("Lenght cannot be negative!");
            }

            this.lenght = lenght;
        }
}
}