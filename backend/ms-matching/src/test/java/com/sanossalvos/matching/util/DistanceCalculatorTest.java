package com.sanossalvos.matching.util;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class DistanceCalculatorTest {

    @Test
    void testDistance_EntreDosPuntos() {
        double lat1 = -33.456;
        double lon1 = -70.678;
        double lat2 = -33.456;
        double lon2 = -70.678;

        double distance = DistanceCalculator.distance(lat1, lon1, lat2, lon2);

        assertThat(distance).isEqualTo(0.0);
    }

    @Test
    void testDistance_EntreSantiagoYValparaiso() {
        double lat1 = -33.456; // Santiago
        double lon1 = -70.678;
        double lat2 = -33.039; // Valparaíso
        double lon2 = -71.627;

        double distance = DistanceCalculator.distance(lat1, lon1, lat2, lon2);

        assertThat(distance).isGreaterThan(0);
        assertThat(distance).isLessThan(200);
    }

    @Test
    void testDistance_ConPuntosCercanos() {
        double lat1 = -33.456;
        double lon1 = -70.678;
        double lat2 = -33.457;
        double lon2 = -70.679;

        double distance = DistanceCalculator.distance(lat1, lon1, lat2, lon2);

        assertThat(distance).isGreaterThan(0);
        assertThat(distance).isLessThan(1);
    }
}