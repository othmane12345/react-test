import { Card, Typography, Space, Avatar } from 'antd';
import _ from 'lodash';
const { Paragraph, Text} = Typography;

function PostCards({post}) {

    function getInitials(text) {
        var initials = '';
        _.forEach(_.map(_.words(post.userName), item => item.charAt(0)), letter => initials = initials + letter + '.');
        return _.trimEnd(initials, '.');
    }

    return (
        <div>
            <Card title={(
                <Space size={'large'}>
                    <Avatar style={{ backgroundColor: '#d67b3d', verticalAlign: 'middle' }} size="large" gap={4} >
                        {getInitials(post.userName)}
                    </Avatar>

                    <Space size={2} direction="vertical">
                        <span>{post.userName}</span>
                        <Text type="secondary">{post.title}</Text>
                    </Space>
                </Space>
                )
            }>

                <Paragraph ellipsis={{rows: 2, expandable: true, symbol: 'more'}}>
                    {post.body}
                </Paragraph>
            </Card>
        </div>
    );
}

export default PostCards;