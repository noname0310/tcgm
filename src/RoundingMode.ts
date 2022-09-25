/**
 * Rounding modes.
 */
export enum RoundingMode {
    /**
     * Discards the fractional part.
     */
    truncate = 0,
    /**
     * Round towards positive infinity.
     */
    ceiling = 1,
    /**
     * Round towards negative infinity.
     */
    floor = 2,
    /**
     * Round towards the nearest neighbor. If both neighbors are equidistant, round
     * towards the even neighbor.
     */
    halfEven = 3,
    /**
     * Round towards the nearest neighbor. If both neighbors are equidistant, round
     * down.
     */
    halfDown = 4,
    /**
     * Round towards the nearest neighbor. If both neighbors are equidistant, round
     * up.
     */
    halfUp = 5
}
