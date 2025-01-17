/*
 * Copyright 2022, Polytechnique Montreal and contributors
 *
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */
import React from 'react';
import Collapsible from 'react-collapsible';
import { withTranslation } from 'react-i18next';
import _toString from 'lodash/toString';
import PreferencesResetToDefaultButton from '../PreferencesResetToDefaultButton';
import { mpsToKph, kphToMps } from 'chaire-lib-common/lib/utils/PhysicsUtils';
import { roundToDecimals } from 'chaire-lib-common/lib/utils/MathUtils';
import InputStringFormatted from 'chaire-lib-frontend/lib/components/input/InputStringFormatted';
import InputWrapper from 'chaire-lib-frontend/lib/components/input/InputWrapper';
import InputSelect from 'chaire-lib-frontend/lib/components/input/InputSelect';
import PreferencesSectionProps from '../PreferencesSectionProps';

const PreferencesSectionGeneral: React.FunctionComponent<PreferencesSectionProps> = (
    props: PreferencesSectionProps
) => {
    const prefs = props.preferences.getAttributes();

    const sections = prefs.sections.transition;
    const sectionsChoices: { value: string; label: string }[] = [];
    for (const sectionShortname in sections) {
        const section = sections[sectionShortname];
        if (section.enabled !== false) {
            sectionsChoices.push({
                label: props.t(section.localizedTitle),
                value: sectionShortname
            });
        }
    }

    return (
        <Collapsible trigger={props.t('main:preferences:General')} open={true} transitionTime={100}>
            <div className="tr__form-section">
                <InputWrapper label={props.t('main:preferences:DefaultSection')}>
                    <InputSelect
                        id={'formFieldPreferencesDefaultSection'}
                        value={prefs.defaultSection}
                        choices={sectionsChoices}
                        t={props.t}
                        onValueChange={(e) => props.onValueChange('defaultSection', { value: e.target.value })}
                    />
                    <PreferencesResetToDefaultButton
                        resetPrefToDefault={props.resetPrefToDefault}
                        path="defaultSection"
                        preferences={props.preferences}
                    />
                </InputWrapper>
                <InputWrapper label={props.t('main:preferences:InfoPanelPosition')}>
                    <InputSelect
                        id={'formFieldPreferencesInfoPanelPosition'}
                        value={prefs.infoPanelPosition}
                        choices={[
                            {
                                label: props.t('main:Left'),
                                value: 'left'
                            },
                            {
                                label: props.t('main:Right'),
                                value: 'right'
                            }
                        ]}
                        t={props.t}
                        onValueChange={(e) => props.onValueChange('infoPanelPosition', { value: e.target.value })}
                    />
                    <PreferencesResetToDefaultButton
                        resetPrefToDefault={props.resetPrefToDefault}
                        path="infoPanelPosition"
                        preferences={props.preferences}
                    />
                </InputWrapper>

                <InputWrapper
                    label={props.t('main:preferences:DefaultWalkingSpeedKph')}
                    help={props.t('main:preferences:DefaultWalkingSpeedKphHelp')}
                >
                    <InputStringFormatted
                        key={`formFieldPreferencesDefaultDefaultWalkingSpeedMetersPerSeconds${props.resetChangesCount}`}
                        id={'formFieldPreferencesDefaultDefaultWalkingSpeedMetersPerSeconds'}
                        value={prefs.defaultWalkingSpeedMetersPerSeconds}
                        onValueUpdated={(value) => props.onValueChange('defaultWalkingSpeedMetersPerSeconds', value)}
                        stringToValue={(value) => (!isNaN(parseFloat(value)) ? kphToMps(parseFloat(value)) : null)}
                        valueToString={(value) =>
                            _toString(!isNaN(parseFloat(value)) ? roundToDecimals(mpsToKph(value), 1) : '')
                        }
                        type="number"
                    />
                    <PreferencesResetToDefaultButton
                        resetPrefToDefault={props.resetPrefToDefault}
                        path="defaultWalkingSpeedMetersPerSeconds"
                        preferences={props.preferences}
                    />
                </InputWrapper>
            </div>
        </Collapsible>
    );
};

export default withTranslation(['main', 'transit'])(PreferencesSectionGeneral);
