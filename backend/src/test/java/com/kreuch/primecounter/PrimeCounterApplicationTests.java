package com.kreuch.primecounter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;                          

@SpringBootTest
class PrimeCounterApplicationTests {

    @Autowired
    private PrimeCounterController controller;

    @Test
    void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    void testOutOfBoundsValues() {
        assertThatThrownBy(() -> { controller.pi(0); })
            .isInstanceOf(IndexOutOfBoundsException.class);
        
        assertThatThrownBy(() -> { controller.pi(PrimeCounterController.MAX_K + 1); })
            .isInstanceOf(IndexOutOfBoundsException.class);
    }

    @Test
    void testEdgeValues() {
        assertThat(controller.pi(1).getBody().count()).isEqualTo(0);

        // Assert that MAX_K doesn't throw
        controller.pi(PrimeCounterController.MAX_K);
    }

    @Test
    void testGeneralValues() {
        // Tests if 2 is handled properly
        assertThat(controller.pi(2).getBody().count()).isEqualTo(1);

        // Tests if K + 1 is not included if prime
        assertThat(controller.pi(292).getBody().count()).isEqualTo(61);

        // Tests if K is included if prime
        assertThat(controller.pi(293).getBody().count()).isEqualTo(62);
    }
}
