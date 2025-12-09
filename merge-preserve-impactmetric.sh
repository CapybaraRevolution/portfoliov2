#!/bin/bash
# Merge script that preserves ImpactMetric component from main branch

SOURCE_BRANCH=$1

if [ -z "$SOURCE_BRANCH" ]; then
  echo "Usage: ./merge-preserve-impactmetric.sh <branch-name>"
  echo "Example: ./merge-preserve-impactmetric.sh feature/preview"
  exit 1
fi

echo "Backing up ImpactMetric from main..."
cp src/components/case-studies/ImpactMetric.tsx /tmp/ImpactMetric_main_backup.tsx

echo "Merging $SOURCE_BRANCH into main..."
git merge origin/$SOURCE_BRANCH --no-edit || {
  echo "Merge conflict detected. Resolving ImpactMetric..."
  git checkout --ours src/components/case-studies/ImpactMetric.tsx
  git add src/components/case-studies/ImpactMetric.tsx
  echo "ImpactMetric restored from main. Please resolve other conflicts if any."
}

echo "Verifying ImpactMetric was preserved..."
if ! diff -q /tmp/ImpactMetric_main_backup.tsx src/components/case-studies/ImpactMetric.tsx > /dev/null 2>&1; then
  echo "Restoring ImpactMetric from main backup..."
  cp /tmp/ImpactMetric_main_backup.tsx src/components/case-studies/ImpactMetric.tsx
  git add src/components/case-studies/ImpactMetric.tsx
  echo "ImpactMetric restored!"
fi

echo "Merge complete. ImpactMetric preserved from main."

