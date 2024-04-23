package com.kreuch.primecounter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;                          

@SpringBootTest
class PrimeCounterTests {

    @Test
    void testOutOfBoundsValues() {
        assertThatThrownBy(() -> { PrimeCounter.pi(0); })
            .isInstanceOf(IndexOutOfBoundsException.class);
        
        assertThatThrownBy(() -> { PrimeCounter.pi(PrimeCounter.MAX_K + 1); })
            .isInstanceOf(IndexOutOfBoundsException.class);
    }

    @Test
    void testEdgeValues() {
        assertThat(PrimeCounter.pi(1)).isEqualTo(0);

        // Assert that MAX_K doesn't throw
        PrimeCounter.pi(PrimeCounter.MAX_K);
    }

    @Test
    void testGeneralValues() {
        // Tests if 2 is handled properly
        assertThat(PrimeCounter.pi(2)).isEqualTo(1);

        // Tests if K + 1 is not included if prime
        assertThat(PrimeCounter.pi(292)).isEqualTo(61);

        // Tests if K is included if prime
        assertThat(PrimeCounter.pi(293)).isEqualTo(62);
    }

}
