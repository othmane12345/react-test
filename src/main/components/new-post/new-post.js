import { Card, Input, Row, Button } from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <div>
            <Card>
                <Input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <TextArea placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} />
                <Row justify='end'><Button type="primary" onClick={() => {}}>ADD</Button></Row>
            </Card>
        </div>
    );
}

export default NewPost;