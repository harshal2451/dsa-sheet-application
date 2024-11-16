import React, { useState, useEffect } from 'react';
import { Layout, List, Button, Checkbox, Pagination, message, Menu, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;
const { Option } = Select;
const apiUrl = process.env.REACT_APP_API_URL;
const DSAHome = () => {
  const [topics, setTopics] = useState([]);
  const [currentTopicId, setCurrentTopicId] = useState(1);
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const navigate = useNavigate();
  
  // Fetch topics when component mounts
  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}/v1/topic`)
      .then(response => setTopics(response.data.data.topics))
      .catch(error => message.error('Error fetching topics'))
      .finally(() => setLoading(false));
  }, []);

  const fetchTopicProblems = async (difficultyFilter) => {
    let token = localStorage.getItem('token');
    setLoading(true);
    axios.get(`${apiUrl}/v1/topic/problems/${currentTopicId}?page=${page}&limit=${5}&difficulty_level=${difficultyFilter}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => setProblems(response.data.data.topics))
      .catch(error => message.error('Error fetching problems'))
      .finally(() => setLoading(false));
  }
  // Fetch problems when a topic is selected
  useEffect(() => {
    if (currentTopicId) {
      fetchTopicProblems(difficultyFilter);
    }
  }, [currentTopicId, difficultyFilter]);

  // Handle problem completion status
  const handleCheckboxChange = (problem) => {
    let token = localStorage.getItem('token');
    setLoading(true);
    let msg = "Problem marked as completed";
    let action = "create";
    if(problem.user_completed.length > 0){
      action = "delete"
      msg = "Problem marked as uncompleted";
    }
    axios.post(`${apiUrl}/v1/user/complete_problem`, {  
      problem_id: problem.id, 
      topic_id: Number(currentTopicId), 
      action
    },  {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async response => {
        message.success(msg)
        await fetchTopicProblems(difficultyFilter);
      })
      .catch(error => message.error('Error updating problem'))
      .finally(() => setLoading(false));
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  // Handle filter change
  const handleDifficultyChange = (value) => {
    setDifficultyFilter(value);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
    {/* Sidebar - Vertical Navbar for Topics */}
    <Sider width={240} style={{ backgroundColor: '#001529' }}>
      <div className="logo" style={{ padding: '16px', color: 'white', fontSize: '20px', fontWeight: 'bold', textAlign: "center" }}>
        DSA Topics
      </div>
      <Menu
        mode="inline"
        theme="dark"
        onClick={({ key }) => setCurrentTopicId(key)}
        defaultSelectedKeys={['1']}
        style={{ height: '85.5%', borderRight: 0, marginTop: "10px"}}
      >
        {topics.map((topic) => (
          <Menu.Item key={topic.id}>
            <Button type="link" style={{ color: '#fff' }}>
              {topic.title}
            </Button>
          </Menu.Item>
        ))}
        <Menu.Divider />
        {/* <Menu.Item key="logout">
          <Button type="primary" block onClick={handleLogout}>Logout</Button>
        </Menu.Item> */}
        
      </Menu>
      <div style={{padding: "0px"}}>
        <Button type="primary" block onClick={handleLogout}>
        Logout
      </Button>
      </div>
    </Sider>

    {/* Main Content Area */}
    <Layout style={{ flex: 1 }}>
      <Content style={{ padding: '20px', background: '#fff' }}>
        {currentTopicId && (
          <>
            <h2>{topics && topics.length > 0 ? topics[currentTopicId-1].title: ""} Problems</h2>
            <Select
                defaultValue="all"
                style={{ width: 200, marginBottom: '20px' }}
                onChange={handleDifficultyChange}
              >
                <Option value="all">All</Option>
                <Option value="easy">Easy</Option>
                <Option value="medium">Medium</Option>
                <Option value="hard">Hard</Option>
              </Select>
            <List
              dataSource={problems.slice((page - 1) * 5, page * 5)} // Pagination for problems
              loading={loading}
              renderItem={(problem) => (
                <List.Item>
                  <div className="problem-card">
                    <h4>{problem.problem_statement}</h4>
                    <a href={problem.youtube_tutorial_link} target="_blank" rel="noopener noreferrer">YouTube</a>
                    <a href={problem.leetcode_link} target="_blank" rel="noopener noreferrer">Leetcode</a>
                    <a href={problem.article_link} target="_blank" rel="noopener noreferrer">Article</a>
                    <span className="difficulty">{problem.difficulty_level}</span>
                    <Checkbox
                      checked={problem?.user_completed?.length > 0 ? true: false}
                      onChange={() => handleCheckboxChange(problem)}
                    />
                  </div>
                </List.Item>
              )}
            />
            <Pagination
              current={page}
              total={problems.length}
              onChange={handlePageChange}
              pageSize={5}
            />
          </>
        )}
      </Content>
    </Layout>
  </Layout>
  );
};

export default DSAHome;
