package com.autocheck;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

/** Test de humo: el contexto completo arranca contra un PostgreSQL real (Testcontainers). */
@SpringBootTest
@ActiveProfiles("test")
@Import(TestcontainersConfiguration.class)
class AutocheckApplicationTests {

	@Test
	void contextLoads() {
	}

}
