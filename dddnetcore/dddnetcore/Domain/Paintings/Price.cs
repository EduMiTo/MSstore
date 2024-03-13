using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Paintings
{
    public class Price : IValueObject
    {

        public double price { get; init; }

        public Price() { }
        public Price(double price)
        {

            if (price < 0)
            {
                throw new BusinessRuleValidationException("Price cannot be negative!");
            }

            this.price = price;
        }
}
}