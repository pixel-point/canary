import {
  Rule,
  RepoBranchSettingsFormFields,
  BranchRuleId,
  PatternsButtonType,
  MergeStrategy
} from '@harnessio/playground'
import {
  EnumRuleState,
  OpenapiRuleDefinition,
  RuleAddRequestBody,
  RuleGetOkResponse,
  OpenapiRule
} from '@harnessio/code-service-client'

const ruleIds = [
  BranchRuleId.REQUIRE_LATEST_COMMIT,
  BranchRuleId.REQUIRE_NO_CHANGE_REQUEST,
  BranchRuleId.COMMENTS,
  BranchRuleId.STATUS_CHECKS,
  BranchRuleId.MERGE,
  BranchRuleId.DELETE_BRANCH,
  BranchRuleId.BLOCK_BRANCH_CREATION,
  BranchRuleId.BLOCK_BRANCH_DELETION,
  BranchRuleId.REQUIRE_PULL_REQUEST,
  BranchRuleId.REQUIRE_CODE_REVIEW
]

// Util to transform API response into expected-form format for branch-rules-edit

const extractBranchRules = (data: RuleGetOkResponse): Rule[] => {
  const rules = []

  for (const rule of ruleIds) {
    let checked = false
    let submenu: MergeStrategy[] = []
    let selectOptions: string[] = []
    let input: string = ''
    const definition = data?.definition as OpenapiRuleDefinition

    switch (rule) {
      case BranchRuleId.REQUIRE_LATEST_COMMIT:
        checked = definition?.pullreq?.approvals?.require_latest_commit || false
        break
      case BranchRuleId.REQUIRE_NO_CHANGE_REQUEST:
        checked = definition?.pullreq?.approvals?.require_no_change_request || false
        break
      case BranchRuleId.COMMENTS:
        checked = definition?.pullreq?.comments?.require_resolve_all || false
        break
      case BranchRuleId.STATUS_CHECKS:
        checked = (definition?.pullreq?.status_checks?.require_identifiers?.length ?? 0) > 0
        selectOptions = definition?.pullreq?.status_checks?.require_identifiers || []
        break
      case BranchRuleId.MERGE:
        checked = (definition?.pullreq?.merge?.strategies_allowed?.length ?? 0) > 0
        submenu = (definition?.pullreq?.merge?.strategies_allowed as MergeStrategy[]) || []
        break
      case BranchRuleId.DELETE_BRANCH:
        checked = definition?.pullreq?.merge?.delete_branch || false
        break
      case BranchRuleId.BLOCK_BRANCH_CREATION:
        checked = definition?.lifecycle?.create_forbidden || false
        break
      case BranchRuleId.BLOCK_BRANCH_DELETION:
        checked = definition?.lifecycle?.delete_forbidden || false
        break
      case BranchRuleId.REQUIRE_PULL_REQUEST:
        checked = definition?.lifecycle?.update_forbidden || false
        break
      case BranchRuleId.REQUIRE_CODE_REVIEW:
        checked = (definition?.pullreq?.approvals?.require_minimum_count ?? 0) > 0
        input = definition?.pullreq?.approvals?.require_minimum_count?.toString() || ''
        break
      default:
        continue
    }

    rules.push({
      id: rule,
      checked,
      submenu,
      selectOptions,
      input
    })
  }

  return rules
}

export const transformDataFromApi = (data: RuleGetOkResponse): RepoBranchSettingsFormFields => {
  const includedPatterns = data?.pattern?.include || []
  const excludedPatterns = data?.pattern?.exclude || []
  const formatPatterns = [
    ...includedPatterns.map(pat => ({ pattern: pat, option: PatternsButtonType.INCLUDE })),
    ...excludedPatterns.map(pat => ({ pattern: pat, option: PatternsButtonType.EXCLUDE }))
  ]

  const rules = extractBranchRules(data)

  return {
    identifier: data.identifier || '',
    description: data.description || '',
    pattern: '',
    patterns: formatPatterns,
    rules: rules,
    state: data.state === 'active',
    bypass: data?.definition?.bypass?.user_ids || [],
    default: data?.pattern?.default,
    repo_owners: data?.definition?.bypass?.repo_owners
  }
}

// Util to transform form format to expected-API format for branch-rules-edit

export const transformFormOutput = (formOutput: RepoBranchSettingsFormFields): RuleAddRequestBody => {
  const rulesMap = formOutput.rules.reduce<Record<string, Rule>>((acc, rule) => {
    acc[rule.id] = rule
    return acc
  }, {})

  const { include, exclude } = formOutput.patterns.reduce<{ include: string[]; exclude: string[] }>(
    (acc, currentPattern) => {
      if (currentPattern.option === PatternsButtonType.INCLUDE) {
        acc.include.push(currentPattern.pattern)
      } else if (currentPattern.option === PatternsButtonType.EXCLUDE) {
        acc.exclude.push(currentPattern.pattern)
      }
      return acc
    },
    { include: [], exclude: [] }
  )

  const transformed: RuleAddRequestBody = {
    identifier: formOutput.identifier,
    type: 'branch',
    description: formOutput.description,
    state: (formOutput.state === true ? 'active' : 'disabled') as EnumRuleState,
    pattern: {
      default: formOutput.default || false,
      include,
      exclude
    },
    definition: {
      bypass: {
        user_ids: formOutput.bypass,
        repo_owners: formOutput.repo_owners || false
      },
      lifecycle: {
        create_forbidden: rulesMap[BranchRuleId.BLOCK_BRANCH_CREATION]?.checked || false,
        delete_forbidden: rulesMap[BranchRuleId.BLOCK_BRANCH_DELETION]?.checked || false,
        update_forbidden: rulesMap[BranchRuleId.REQUIRE_PULL_REQUEST]?.checked || false
      },
      pullreq: {
        approvals: {
          require_code_owners: true,
          require_latest_commit: rulesMap[BranchRuleId.REQUIRE_LATEST_COMMIT]?.checked || false,
          require_no_change_request: rulesMap[BranchRuleId.REQUIRE_NO_CHANGE_REQUEST]?.checked || false,
          require_minimum_count: rulesMap[BranchRuleId.REQUIRE_CODE_REVIEW].checked
            ? parseInt(rulesMap[BranchRuleId.REQUIRE_CODE_REVIEW].input) || 0
            : 0
        },
        comments: {
          require_resolve_all: rulesMap[BranchRuleId.COMMENTS]?.checked || false
        },
        merge: {
          strategies_allowed: (rulesMap[BranchRuleId.MERGE]?.submenu as MergeStrategy[]) || [],
          delete_branch: rulesMap[BranchRuleId.DELETE_BRANCH]?.checked || false
        },
        status_checks: {
          require_identifiers: rulesMap[BranchRuleId.STATUS_CHECKS]?.selectOptions || []
        }
      }
    }
  }

  return transformed
}

export const getTotalRulesApplied = (obj: OpenapiRule) => {
  let totalRules = 0
  const transformRules = transformDataFromApi(obj)['rules']

  for (const rule of transformRules) {
    if (rule.checked === true) {
      totalRules++
    }
  }

  return totalRules
}
