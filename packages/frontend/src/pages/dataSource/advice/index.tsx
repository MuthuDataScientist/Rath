import { observer } from 'mobx-react-lite';
import { MessageBar, MessageBarButton, MessageBarType } from 'office-ui-fabric-react';
import React from 'react';
import { useGlobalStore } from '../../../store';
import styled from 'styled-components';
import intl from 'react-intl-universal';

const AdviceContainer = styled.div`
    .row{
        margin-bottom: 3px;
        margin-top: 3px;
    }

`

interface AdviceProps {
    onForceAnalysis?: () => void;
}

const Advice: React.FC<AdviceProps> = props => {
    const { onForceAnalysis } = props;
    const { dataSourceStore } = useGlobalStore();
    const { measures, cleanedData, hasOriginalDimensionInData, groupMeanLimitCountsLog } = dataSourceStore;

    return <AdviceContainer>
        {
            cleanedData.length === 0 && <MessageBar className="row">
                    {intl.get('dataSource.advice.lackData')}
                </MessageBar>
        }
        {
            !hasOriginalDimensionInData && <MessageBar className="row"
                isMultiline={false}
                actions={<div>
                    <MessageBarButton onClick={onForceAnalysis}>{intl.get('dataSource.advice.forceAnalysis')}</MessageBarButton>
                </div>}
                messageBarType={MessageBarType.blocked}>
                    {intl.get('dataSource.advice.lackDimension')}
                </MessageBar>
        }
        {
            measures.length === 0 && <MessageBar className="row"
                isMultiline={false}
                actions={<div>
                    <MessageBarButton onClick={onForceAnalysis}>{intl.get('dataSource.advice.forceAnalysis')}</MessageBarButton>
                </div>}
                messageBarType={MessageBarType.blocked}>
                    {intl.get('dataSource.advice.lackMeasure')}
                </MessageBar>
        }
        {
            Math.log2(cleanedData.length) - groupMeanLimitCountsLog < Math.log2(8) && <MessageBar className="row"
                messageBarType={MessageBarType.warning}>
                    {intl.get('dataSource.advice.smallSample')}
                </MessageBar>
        }
    </AdviceContainer>
}

export default observer(Advice);