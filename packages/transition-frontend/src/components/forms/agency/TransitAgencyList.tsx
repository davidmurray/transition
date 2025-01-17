/*
 * Copyright 2022, Polytechnique Montreal and contributors
 *
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import _get from 'lodash/get';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import Button from 'chaire-lib-frontend/lib/components/input/Button';
import Preferences from 'chaire-lib-common/lib/config/Preferences';
import serviceLocator from 'chaire-lib-common/lib/utils/ServiceLocator';
import Agency from 'transition-common/lib/services/agency/Agency';
import Line from 'transition-common/lib/services/line/Line';
import AgencyCollection from 'transition-common/lib/services/agency/AgencyCollection';
import TransitAgencyButton from './TransitAgencyButton';
import ButtonList from '../../parts/ButtonList';

interface AgencyListProps extends WithTranslation {
    agencyCollection?: AgencyCollection;
    selectedAgency?: Agency;
    selectedLine?: Line;
}

const TransitAgencyList: React.FunctionComponent<AgencyListProps> = (props: AgencyListProps) => {
    const newAgency = function () {
        const defaultColor = Preferences.get('transit.agencies.defaultColor', '#0086FF');
        const newAgency = new Agency({ color: defaultColor }, true, serviceLocator.collectionManager);
        newAgency.startEditing();
        serviceLocator.selectedObjectsManager.select('agency', newAgency);
    };

    const newLine = function () {
        const defaultColor = Preferences.get('transit.lines.defaultColor', '#0086FF');
        const newLine = new Line({ color: defaultColor }, true, serviceLocator.collectionManager);
        newLine.startEditing();
        serviceLocator.selectedObjectsManager.select('line', newLine);
    };

    const objectSelected = props.selectedAgency !== undefined || props.selectedLine !== undefined;

    return (
        <div className="tr__list-transit-scenarios-container">
            <h3>
                <img
                    src={'/dist/images/icons/transit/agency_white.svg'}
                    className="_icon"
                    alt={props.t('transit:transitAgency:List')}
                />{' '}
                {props.t('transit:transitAgency:List')}
            </h3>
            <ButtonList key="agencies">
                {props.agencyCollection &&
                    props.agencyCollection
                        .getFeatures()
                        .map((agency: Agency) => (
                            <TransitAgencyButton
                                key={agency.id}
                                agency={agency}
                                selectedAgency={props.selectedAgency}
                                selectedLine={props.selectedLine}
                            />
                        ))}
            </ButtonList>

            {!objectSelected && props.agencyCollection && (
                <div className="tr__form-buttons-container">
                    <Button
                        color="blue"
                        icon={faPlus}
                        iconClass="_icon"
                        label={props.t('transit:transitAgency:New')}
                        onClick={newAgency}
                    />
                </div>
            )}

            {!objectSelected && props.agencyCollection && props.agencyCollection.size() > 0 && (
                <div className="tr__form-buttons-container">
                    <Button
                        color="blue"
                        icon={faPlus}
                        iconClass="_icon"
                        label={props.t('transit:transitLine:New')}
                        onClick={newLine}
                    />
                </div>
            )}
        </div>
    );
};

export default withTranslation(['transit', 'main'])(TransitAgencyList);
