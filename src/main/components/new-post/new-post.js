import { Card, Input, Row, Button, notification, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { addNewPost } from '../../store/posts/post-slice';

const { TextArea } = Input;
const { Option } = Select;

function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedUser , setSelectedUser] = useState();
    const dispatch = useDispatch();
    const userAuthorization = useSelector(state => state.user.userAuthorization);
    const currentUser = useSelector(state => state.user.userId)
    const users = useSelector(state => state.user.users);
    
    const openNotification = (scope) => {
      notification.error({
        message: 'Error',
        description:
          `The ${scope} is empty please make sure that the post has a title and a content.`,
        placement: 'bottomRight'
      });
    }

    function addNewPostFunction() {
        const isTitleEmpty = _.isEmpty(_.trim(title));
        const isContentEmpty = _.isEmpty(_.trim(content));
        if (isTitleEmpty) {
          openNotification('title');
        } else if (isContentEmpty) {
          openNotification('content');
        } else {
            dispatch(addNewPost(userAuthorization === 'Admin' ? {title, body: content, id: selectedUser} : {title, body: content} ));
            setTitle('');
            setContent('');
        }
    }

    useEffect(() => {
      setSelectedUser(currentUser);
    }, [users])

    return (
        <div>
            <Card>
                <Input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <TextArea placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} />
                <Row justify={userAuthorization === 'Admin' ? 'space-around' :'end'} align='middle'>
                  <Button type="primary" onClick={() => addNewPostFunction()} style={{'width': userAuthorization === 'Admin' ? '75%' : '100%', 'marginTop': '9px'}} block>ADD</Button>
                  {userAuthorization === 'Admin' ? <Select value={selectedUser} onChange={(e) => setSelectedUser(e)} style={{'width': '24%', 'marginTop': '9px'}}>
                    {_.map(users, user => <Option key={user.id} value={user.id}>{user.name}</Option>)}
                  </Select> : null}
                </Row>
            </Card>
        </div>
    );
}

export default NewPost;