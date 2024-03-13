using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Paintings
{
    public class Width : IValueObject
    {

        public double width { get; init; }

        public Width() { }
        public Width(double width)
        {

            if (width < 0)
            {
                throw new BusinessRuleValidationException("Width cannot be negative!");
            }

            this.width = width;
        }
}
}