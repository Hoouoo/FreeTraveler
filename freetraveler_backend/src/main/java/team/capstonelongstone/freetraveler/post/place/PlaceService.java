package team.capstonelongstone.freetraveler.post.place;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;

    public Long savePlace(Place place){
        return placeRepository.save(place).getId();
    }

    public void uploadPlaceImg(MultipartFile file, String imgName, String suffix) throws IOException {
        file.transferTo(new File("C:\\"+imgName+suffix));
    }
}
