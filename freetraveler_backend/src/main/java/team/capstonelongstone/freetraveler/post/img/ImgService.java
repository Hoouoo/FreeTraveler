package team.capstonelongstone.freetraveler.post.img;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.board.BoardRepository;

import team.capstonelongstone.freetraveler.post.day.Day;
import team.capstonelongstone.freetraveler.post.day.DayRepository;

import team.capstonelongstone.freetraveler.post.place.Place;
import team.capstonelongstone.freetraveler.post.place.PlaceRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

/**
 * @author 정순범, 박성호
 * 이미저 저장 기능
 */
@Service
@RequiredArgsConstructor
public class ImgService {


    @Autowired
    BoardRepository boardRepository;


    private final PlaceRepository placeRepository;

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    DayRepository dayRepository;


    /**
     * 이미지 저장
     */
    public void uploadImg(MultipartFile file, String imgName, String suffix) throws IOException {
        String myDirectory = System.getProperty("user.dir");
        file.transferTo(new File(myDirectory, imgName + suffix));
    }

    /**
     * 이미지 경로 설정
     */
    public List<String> getImgPath_Name(String imgName, String suffix) {
        List<String> list = new ArrayList<>();
        String myDirectory = System.getProperty("user.dir");
        System.out.println("~~~~~~~~~~~~~~~~~> >>>> myDirectory = " + myDirectory);
        list.add(myDirectory);
        list.add(imgName + suffix);
        return list;
    }

    /**
     * board 아이디 가져오기
     * board 가 미리 생성 되있지 않으면 1
     * 아니면 마지막 id반환
     */
    public int getImgId() {
        List<Board> boardList = boardRepository.findAll();
        int targetImgID = 0;

        if (boardList.isEmpty()) {
            return 1;
        } else {
            for (Board target : boardList) {
                targetImgID = target.getId().intValue();
            }
        }

        return targetImgID;
    }

    /**
     * board 저장
     */
    public List<String> boardSaveImg(HttpServletRequest request, MultipartFile file) throws IOException {

        HttpSession session = request.getSession();
        Account account = (Account) session.getAttribute("account");
        String ImgUUID = account.getUserId() + "_" + (getImgId()+1); //대표 이미지 UUID
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."), file.getOriginalFilename().length());
        uploadImg(file, ImgUUID, suffix);

        return getImgPath_Name(ImgUUID, suffix);

    }

    /**
     * 보드 수정 시 사용할 메서드
     */
    public List<String> boardModifyImg(Long id, HttpServletRequest request) throws IOException{

        HttpSession session = request.getSession();
        Account account = (Account) session.getAttribute("account");
        String ImgUUID = account.getUserId() + "_" + getImgId(); //대표 이미지 UUID
        // 이미지가 null 일 경우
        Board targetBoard = boardRepository.findById(id).orElse(null);
        if(Objects.nonNull(targetBoard)){
            String suffix = targetBoard.getRepImgName().substring(targetBoard.getRepImgName().lastIndexOf("."));
            return getImgPath_Name(ImgUUID, suffix);
        }
        return null;
    }

    /**
     * day, place 저장
     */
    public List<String> daySaveImg(HttpServletRequest request, MultipartFile file, int day, int j) throws IOException {

        HttpSession session = request.getSession();
        Account account = (Account) session.getAttribute("account");

        String ImgUUID = account.getUserId() + "_" + day + "_" + j + "_" + getImgId();
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."), file.getOriginalFilename().length());

        uploadImg(file, ImgUUID, suffix);
        return getImgPath_Name(ImgUUID, suffix);
    }


    public List<String> dayModifyImg(Long placeId, HttpServletRequest request, int day, int j) throws IOException {

        HttpSession session = request.getSession();
        Account account = (Account) session.getAttribute("account");

        String ImgUUID = account.getUserId() + "_" + day + "_" + j + "_" + getImgId();

        Place targetPlace = placeRepository.findById(placeId).orElse(null);
        if(Objects.isNull(targetPlace)){
            return null;
        }

    /**
     * 이미지 삭제
     */
    public void deleteImg(String boardId){
        Long LongBoardId=Integer.valueOf(boardId).longValue();
        Board byBoardId = boardRepository.findByBoardId(LongBoardId);

        List<Day> allByBoard = dayRepository.findAllByBoard(byBoardId);
        String boardImg = byBoardId.getRepImgPath() + "\\"+ byBoardId.getRepImgName();

        File file=new File(boardImg);
        if(file.exists()){
            file.delete();
        }

        for (Day day : allByBoard) {
            List<Place> allBYDayId = placeRepository.findAllBYDayId(day.getId());

            for (Place place : allBYDayId) {
                String placeImg=place.getPlaceImgPath() + "\\" + place.getPlaceImgName();
                System.out.println(placeImg);
                File file2=new File(placeImg);
                if(file2.exists()){
                    file2.delete();
                }
            }
        }

    }

        String suffix = targetPlace.getPlaceImgName().substring(targetPlace.getPlaceImgName().lastIndexOf("."));
        return getImgPath_Name(ImgUUID, suffix);
    }
}
