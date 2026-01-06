import { injectProfile } from '../utils/profileInjector';
import { ONC_PROFILE_URLS } from '../schemas/oncProfiles';

describe('Profile Injector Utility', () => {

    describe('Observation Profile Detection', () => {
        it('should inject NEWS2 profile for code 88330-6', () => {
            const resource = {
                resourceType: 'Observation',
                code: { coding: [{ system: 'http://loinc.org', code: '88330-6' }] }
            };
            const result = injectProfile(resource);
            expect(result.meta?.profile).toContain(ONC_PROFILE_URLS.news2Score);
        });

        it('should inject GCS profile for code 9269-2', () => {
            const resource = {
                resourceType: 'Observation',
                code: { coding: [{ system: 'http://loinc.org', code: '9269-2' }] }
            };
            const result = injectProfile(resource);
            expect(result.meta?.profile).toContain(ONC_PROFILE_URLS.gcsScale);
        });

        it('should inject MUST profile for code 75303-8', () => {
            const resource = {
                resourceType: 'Observation',
                code: { coding: [{ system: 'http://loinc.org', code: '75303-8' }] }
            };
            const result = injectProfile(resource);
            expect(result.meta?.profile).toContain(ONC_PROFILE_URLS.mustScore);
        });

        it('should inject Frailty profile for code 91535-5', () => {
            const resource = {
                resourceType: 'Observation',
                code: { coding: [{ system: 'http://loinc.org', code: '91535-5' }] }
            };
            const result = injectProfile(resource);
            expect(result.meta?.profile).toContain(ONC_PROFILE_URLS.frailtyScale);
        });

        it('should inject Oral Health profile for custom code ONC-ROAG-Score', () => {
            const resource = {
                resourceType: 'Observation',
                code: { coding: [{ code: 'ONC-ROAG-Score' }] }
            };
            const result = injectProfile(resource);
            expect(result.meta?.profile).toContain(ONC_PROFILE_URLS.oralHealthAssessment);
        });
    });

    describe('Other Resource Types', () => {
        it('should inject Nursing Problem profile for Condition', () => {
            const resource = { resourceType: 'Condition' };
            const result = injectProfile(resource);
            expect(result.meta?.profile).toContain(ONC_PROFILE_URLS.nursingProblem);
        });

        it('should inject Patient Goal profile for Goal', () => {
            const resource = { resourceType: 'Goal' };
            const result = injectProfile(resource);
            expect(result.meta?.profile).toContain(ONC_PROFILE_URLS.patientGoal);
        });

        it('should inject Nursing Intervention profile for Procedure', () => {
            const resource = { resourceType: 'Procedure' };
            const result = injectProfile(resource);
            expect(result.meta?.profile).toContain(ONC_PROFILE_URLS.nursingIntervention);
        });
    });

    describe('Preservation of Existing Profile', () => {
        it('should NOT modify resources that already have meta.profile', () => {
            const existingProfile = 'http://example.org/custom-profile';
            const resource = {
                resourceType: 'Observation',
                meta: { profile: [existingProfile] },
                code: { coding: [{ system: 'http://loinc.org', code: '88330-6' }] }
            };
            const result = injectProfile(resource);
            expect(result.meta?.profile).toEqual([existingProfile]);
        });
    });
});
