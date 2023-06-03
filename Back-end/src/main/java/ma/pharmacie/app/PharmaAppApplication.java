package ma.pharmacie.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Localisation des pharmacies - APIs", description = "Description", version = "1.0"))
public class PharmaAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(PharmaAppApplication.class, args);
	}
	
	//@Bean
	//CommandLineRunner start(CompteServiceImpl compteServiceImpl) {
		//return args -> {
			//compteServiceImpl.saveRole(new Role(null, "User"));
			//compteServiceImpl.saveRole(new Role(null, "Admin"));
			//compteServiceImpl.saveRole(new Role(null, "Costumer"));
			
			//compteServiceImpl.saveUtilisateur(new Utilisateur(null, "ismaini.hamid@gmail.com", "12345", ""));
			
		//};
	//}
}
