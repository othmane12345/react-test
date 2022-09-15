import { Card } from 'antd';

function PostCards({post}) {
    return (
        <div>
            <Card title={post.title}>
                 {post.body}
            </Card>
        </div>
    );
}

export default PostCards;