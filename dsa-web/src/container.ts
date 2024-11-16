import UserDAO from '../src/services/Users/UserDao';
import TopicDAO from '../src/services/Topics/TopicDao';
import ProblemDAO from '../src/services/Topics/ProblemDao';
import UserCompletedProblemDAO from './services/Users/UserCompletedProblemDao';
import UserService from '../src/services/Users/UserService';
import TopicsService from '../src/services/Topics/TopicService';


export interface ServiceContainer {

    // daos
    userDAO: UserDAO;
    topicDAO: TopicDAO;
    problemDAO: ProblemDAO;
    userCompletedProblemDAO: UserCompletedProblemDAO;

    // services
    userService: UserService;
    topicsService: TopicsService;
}

class Container implements ServiceContainer{

  public userDAO: UserDAO;
  public topicDAO: TopicDAO;
  public problemDAO: ProblemDAO;
  public userCompletedProblemDAO: UserCompletedProblemDAO;
  public userService: UserService;
  public topicsService: TopicsService;

  constructor() {
    this.userDAO = new UserDAO();
    this.topicDAO = new TopicDAO();
    this.problemDAO = new ProblemDAO();
    this.userCompletedProblemDAO = new UserCompletedProblemDAO();
    this.userService = new UserService(this.userDAO, this.userCompletedProblemDAO);
    this.topicsService = new TopicsService(this.topicDAO, this.problemDAO);
  }
}

const container = new Container();


//for quick use anywhere out of service context
export const getService = () => {
    return container;
}
